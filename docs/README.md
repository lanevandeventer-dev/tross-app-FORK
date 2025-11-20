# Documentation

Welcome to TrossApp documentation.

---

## Philosophy

**Document WHY, not HOW**
- Architecture decisions and rationale
- Design patterns and trade-offs  
- Constraints and evolution guidance
- Code is self-documenting (tests are executable specs)

**Evergreen content only**
- No brittle metrics (test counts, version numbers in prose)
- No implementation details (they go stale)
- No code snippets (read the source)

---

## Core Documentation

### 🚀 [Quick Start](QUICK_START.md)
Get running in 5 minutes. Prerequisites, installation, dev mode.

### 🏗️ [Architecture](ARCHITECTURE.md)
Core patterns and decisions. KISS, security-first, test-driven. Locked patterns (🔒).

### 💻 [Development](DEVELOPMENT.md)
Daily workflow, code organization, adding features, Git workflow.

### ✅ [Testing](TESTING.md)
Philosophy, patterns, pyramid. 1675+ tests, <70s execution.

### 🔐 [Security](SECURITY.md)
Triple-tier security (Auth0 + RBAC + RLS), hardening, audit logging.

### 🔑 [Authentication](AUTH.md)
Dual auth (dev + Auth0), JWT tokens, RBAC, session management.

### 📡 [API](API.md)
REST endpoints, request/response patterns, error handling, OpenAPI docs.

### 🚀 [Deployment](DEPLOYMENT.md)
Production deployment, Docker, CI/CD, SSL, monitoring.

---

## Collaboration & Deployment Infrastructure

### 🔄 [CI/CD Guide](CI_CD_GUIDE.md)
Complete pipeline documentation. Fork workflow, E2E testing strategy, deployment automation.

### 🚂 [Railway Deployment](RAILWAY_DEPLOYMENT.md)
Backend hosting guide. $10-15/month, PostgreSQL included, auto-deploy on push.

### ▲ [Vercel Deployment](VERCEL_DEPLOYMENT.md)
Frontend hosting guide. Free tier, PR preview URLs, auto-deploy on merge.

### ☁️ [GitHub Codespaces](CODESPACES.md)
Cloud development environment. Zero local setup, perfect for non-technical collaborators.

### 🔒 [Branch Protection Setup](../.github/BRANCH_PROTECTION_SETUP.md)
GitHub UI configuration guide. Require PR approval, CI checks, maintainer-only merge.

### 🤝 [Contributors Guide](../CONTRIBUTORS.md)
How to contribute. Fork workflow, testing requirements, team recognition.

---

## Reference Documentation

### Database
- [Database Architecture](architecture/DATABASE_ARCHITECTURE.md) - Schema design, Entity Contract v2.0
- [Entity Lifecycle](architecture/ENTITY_LIFECYCLE.md) - Status field patterns
- [Validation Architecture](architecture/VALIDATION_ARCHITECTURE.md) - Multi-tier validation

### Decisions
- [Architecture Decision Records](architecture/decisions/) - ADRs documenting key choices

---

## Status

**✅ Documentation Consolidation Complete!**

**Before:** 38+ scattered markdown files across 12 directories  
**After:** 8 consolidated top-level docs (~2,300 lines total)

All docs follow "WHY not HOW" philosophy:
- ✅ Document architectural decisions, not implementation details
- ✅ Evergreen content (no brittle metrics)
- ✅ Cross-referenced for easy navigation
- ✅ Security-conscious and production-ready
- ✅ Matches backend excellence (1675 tests, ZERO issues, LOCKED)

