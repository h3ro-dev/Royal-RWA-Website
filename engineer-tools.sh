#!/bin/bash

# Engineer Tools - Helper script for Royal RWA development streams

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display the menu
show_menu() {
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}     Royal RWA - Engineer Development Tools${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo "1) Switch to Engineer 1 (Foundation) branch"
    echo "2) Switch to Engineer 2 (Features) branch"
    echo "3) Switch to Engineer 3 (Data) branch"
    echo "4) Switch to Engineer 4 (Performance) branch"
    echo ""
    echo "5) Check all branch statuses"
    echo "6) Update interfaces.json"
    echo "7) Run integration check"
    echo "8) Show my current branch info"
    echo ""
    echo "9) Create PR for my branch"
    echo "0) Exit"
    echo ""
}

# Function to switch branches
switch_branch() {
    local branch=$1
    echo -e "${YELLOW}Switching to $branch...${NC}"
    
    # Stash any changes
    if [[ -n $(git status -s) ]]; then
        echo -e "${YELLOW}Stashing current changes...${NC}"
        git stash push -m "Auto-stash before switching to $branch"
    fi
    
    # Switch branch
    git checkout $branch
    git pull origin $branch
    
    echo -e "${GREEN}✓ Switched to $branch${NC}"
}

# Function to check branch statuses
check_statuses() {
    echo -e "${BLUE}Branch Status Report${NC}"
    echo "===================="
    
    for branch in feat/engineer1-foundation feat/engineer2-features feat/engineer3-data feat/engineer4-performance; do
        echo ""
        echo -e "${YELLOW}$branch:${NC}"
        
        # Get latest commit
        git log origin/$branch -1 --pretty=format:"  Latest: %h - %s (%cr by %an)"
        echo ""
        
        # Count commits in last 24h
        commits_24h=$(git rev-list --count --since="24 hours ago" origin/$branch 2>/dev/null || echo "0")
        echo "  Commits (24h): $commits_24h"
        
        # Check if behind main
        behind=$(git rev-list --count origin/$branch..origin/main 2>/dev/null || echo "0")
        if [ "$behind" -gt 0 ]; then
            echo -e "  ${RED}Behind main by $behind commits${NC}"
        else
            echo -e "  ${GREEN}Up to date with main${NC}"
        fi
    done
}

# Function to update interfaces.json
update_interfaces() {
    current_branch=$(git branch --show-current)
    engineer_num=""
    
    # Determine engineer number from branch
    if [[ $current_branch == *"engineer1"* ]]; then
        engineer_num="1"
    elif [[ $current_branch == *"engineer2"* ]]; then
        engineer_num="2"
    elif [[ $current_branch == *"engineer3"* ]]; then
        engineer_num="3"
    elif [[ $current_branch == *"engineer4"* ]]; then
        engineer_num="4"
    fi
    
    if [ -z "$engineer_num" ]; then
        echo -e "${RED}Error: Not on an engineer branch!${NC}"
        return
    fi
    
    echo -e "${YELLOW}Opening interfaces.json for Engineer $engineer_num...${NC}"
    echo ""
    echo "Remember to:"
    echo "- Only modify the 'engineer$engineer_num' section"
    echo "- Update status fields (planned → in-progress → ready)"
    echo "- Update the _lastUpdated timestamp"
    echo ""
    
    # Open in default editor
    ${EDITOR:-nano} interfaces.json
    
    # Show what changed
    echo ""
    echo -e "${BLUE}Changes made:${NC}"
    git diff interfaces.json
}

# Function to run integration check
run_integration() {
    echo -e "${YELLOW}Running local integration check...${NC}"
    
    # Validate interfaces.json
    echo "Validating interfaces.json..."
    node -e "
    try {
        const fs = require('fs');
        const interfaces = JSON.parse(fs.readFileSync('interfaces.json', 'utf8'));
        console.log('✓ interfaces.json is valid JSON');
        
        // Check all sections exist
        const required = ['engineer1', 'engineer2', 'engineer3', 'engineer4', 'shared'];
        const missing = required.filter(s => !interfaces[s]);
        
        if (missing.length > 0) {
            console.error('✗ Missing sections:', missing);
            process.exit(1);
        }
        
        console.log('✓ All engineer sections present');
        
        // Show summary
        console.log('\nComponent Status:');
        Object.entries(interfaces.engineer1.components).forEach(([name, comp]) => {
            const emoji = comp.status === 'ready' ? '✅' : comp.status === 'in-progress' ? '🚧' : '⏳';
            console.log(\`  \${emoji} \${name}: \${comp.status}\`);
        });
        
    } catch (e) {
        console.error('✗ Error:', e.message);
        process.exit(1);
    }
    " || return
    
    # Run build if package.json exists
    if [ -f "package.json" ]; then
        echo ""
        echo "Running build check..."
        npm run build || echo "Build not configured yet"
    fi
}

# Function to show current branch info
show_branch_info() {
    current_branch=$(git branch --show-current)
    echo -e "${BLUE}Current Branch Information${NC}"
    echo "========================="
    echo "Branch: $current_branch"
    
    if [[ $current_branch == *"engineer"* ]]; then
        # Show recent commits
        echo ""
        echo "Recent commits:"
        git log -5 --pretty=format:"  %h - %s (%cr)"
        echo ""
        
        # Show status
        echo ""
        echo "Working directory status:"
        git status -s
        
        # Show time since last commit
        last_commit_time=$(git log -1 --pretty=format:"%cr")
        echo ""
        echo -e "Last commit: ${YELLOW}$last_commit_time${NC}"
        
        # Reminder about 2-hour commits
        hours_ago=$(git log -1 --pretty=format:"%ct")
        current_time=$(date +%s)
        hours_diff=$(( ($current_time - $hours_ago) / 3600 ))
        
        if [ $hours_diff -gt 2 ]; then
            echo -e "${RED}⚠️  Remember to commit every 2 hours!${NC}"
        fi
    fi
}

# Function to create PR
create_pr() {
    current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch == *"engineer"* ]]; then
        echo -e "${RED}Error: Not on an engineer branch!${NC}"
        return
    fi
    
    # Push current branch
    echo -e "${YELLOW}Pushing current branch...${NC}"
    git push origin $current_branch
    
    # Create PR using GitHub CLI
    echo -e "${YELLOW}Creating pull request...${NC}"
    
    # Determine title based on branch
    title=""
    if [[ $current_branch == *"engineer1"* ]]; then
        title="Engineer 1: Foundation Components Update"
    elif [[ $current_branch == *"engineer2"* ]]; then
        title="Engineer 2: Features Implementation"
    elif [[ $current_branch == *"engineer3"* ]]; then
        title="Engineer 3: Data & API Integration"
    elif [[ $current_branch == *"engineer4"* ]]; then
        title="Engineer 4: Performance & Testing"
    fi
    
    gh pr create --base main --head $current_branch --title "$title" --body "## Changes

This PR includes updates from $current_branch.

## Checklist
- [ ] interfaces.json updated with current status
- [ ] All tests passing in my domain
- [ ] No console errors
- [ ] Committed regularly (every 2 hours)
- [ ] Code is production-ready

## interfaces.json Status
\`\`\`json
$(cat interfaces.json | jq ".${current_branch/feat\//}" 2>/dev/null || echo "See interfaces.json")
\`\`\`
"
}

# Main loop
while true; do
    show_menu
    read -p "Select an option: " choice
    echo ""
    
    case $choice in
        1) switch_branch "feat/engineer1-foundation" ;;
        2) switch_branch "feat/engineer2-features" ;;
        3) switch_branch "feat/engineer3-data" ;;
        4) switch_branch "feat/engineer4-performance" ;;
        5) check_statuses ;;
        6) update_interfaces ;;
        7) run_integration ;;
        8) show_branch_info ;;
        9) create_pr ;;
        0) 
            echo -e "${GREEN}Goodbye! Happy coding! 🚀${NC}"
            exit 0 
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    clear
done 