# Royal RWA Development Streams Setup

## 🚀 Quick Start

The development streams are now fully configured! Here's how to get started:

```bash
# Use the engineer tools script
./engineer-tools.sh

# Or manually switch to your branch
git checkout feat/engineer1-foundation  # For Engineer 1
git checkout feat/engineer2-features     # For Engineer 2
git checkout feat/engineer3-data         # For Engineer 3
git checkout feat/engineer4-performance  # For Engineer 4
```

## 📊 Stream Architecture

### Branches Created
- `feat/engineer1-foundation` - Design system and components
- `feat/engineer2-features` - User flows and pages
- `feat/engineer3-data` - APIs and Web3 integration
- `feat/engineer4-performance` - Testing and optimization

### Communication Hub
- **interfaces.json** - Central contract between all engineers
- Update your section when creating/modifying interfaces
- Check other sections to see what's available

## 🤖 Automated Workflows

### 1. Integration Check (On Every Push)
- **File**: `.github/workflows/integration.yml`
- Validates interfaces.json structure
- Runs type checking and linting
- Shows component implementation status
- Triggers on push to any engineer branch

### 2. Scheduled Integration (Every 6 Hours)
- **File**: `.github/workflows/scheduled-integration.yml`
- Attempts to merge all engineer branches
- Runs full integration tests
- Builds production bundle
- Generates integration report

### 3. Engineer Sync (Every 12 Hours)
- **File**: `.github/workflows/engineer-sync.yml`
- Checks cross-engineer dependencies
- Monitors commit activity
- Creates GitHub issues for problems
- Ensures interfaces.json is kept up-to-date

### 4. Branch Protection (On PRs)
- **File**: `.github/workflows/branch-protection.yml`
- Verifies engineers only modify their own sections
- Runs domain-specific tests
- Checks commit frequency
- Enforces quality gates

## 🛠️ Engineer Tools Script

The `engineer-tools.sh` script provides:

1. **Quick branch switching** with automatic stashing
2. **Status checking** for all engineer branches
3. **interfaces.json editing** with validation
4. **Integration testing** locally
5. **PR creation** with pre-filled templates

### Usage:
```bash
./engineer-tools.sh
```

Then select from the menu:
- Options 1-4: Switch between engineer branches
- Option 5: Check all branch statuses
- Option 6: Update interfaces.json
- Option 7: Run local integration check
- Option 8: Show current branch info
- Option 9: Create a pull request

## 📋 Daily Workflow

### Morning Routine
1. Run `./engineer-tools.sh` and select option 8 to check your status
2. Pull latest changes from your branch
3. Check interfaces.json for updates from other engineers
4. Plan your 2-hour sprints

### Every 2 Hours
1. Commit your changes (requirement!)
2. Update your section in interfaces.json
3. Push to your branch
4. Integration checks run automatically

### End of Day
1. Final commit and push
2. Update interfaces.json with current status
3. Check integration workflow status on GitHub

## 🔄 Integration Flow

```
Engineer Branches → Push → Integration Check → Every 6h → Full Integration Test
                     ↓                                           ↓
                interfaces.json ← Every 12h Sync → Create Issues if Problems
```

## 📊 Monitoring

### GitHub Actions Dashboard
View all workflow runs at:
```
https://github.com/CryptoJym/Royal-RWA-Website/actions
```

### Key Metrics Tracked:
- Commit frequency (target: every 2 hours)
- interfaces.json update frequency
- Branch merge compatibility
- Build success rate
- Performance targets

## 🚨 Troubleshooting

### Merge Conflicts
1. The scheduled integration will detect conflicts
2. Resolve in your branch before creating PR
3. Use interfaces.json to coordinate changes

### Stale Branch Warning
- If no commits for 48+ hours, sync workflow creates an issue
- Run `./engineer-tools.sh` option 5 to check all branch statuses

### Failed Integration
1. Check GitHub Actions for error details
2. Fix issues in your branch
3. Push fixes and re-run workflow

## 🎯 Success Criteria

Each engineer should:
- ✅ Commit every 2 hours minimum
- ✅ Keep interfaces.json updated
- ✅ Maintain green CI status
- ✅ No console errors in their domain
- ✅ Meet performance targets
- ✅ Work independently without blocking others

## 🔗 Important Links

- **Repository**: https://github.com/CryptoJym/Royal-RWA-Website
- **Actions**: https://github.com/CryptoJym/Royal-RWA-Website/actions
- **Engineer Workflows**: `/docs/engineer-workflows/`
- **interfaces.json**: Root directory

---

**Remember**: The magic happens when four minds work independently toward a shared vision, communicating through clean interfaces! 🚀 