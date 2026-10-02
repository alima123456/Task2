# jenkins-demo-app — Jenkins CI/CD pipeline

A small Node.js app that a Jenkins declarative pipeline (`Jenkinsfile`) builds, tests, pushes to DockerHub and deploys.

## Pipeline stages
| Stage | What it does |
|---|---|
| Checkout | Pulls the repo (`checkout scm`) |
| Build | `npm install` |
| Test | `npm test` (Node built-in test runner) |
| Docker Build | Builds the image, tagged with the build number and `latest` |
| Push to DockerHub | Logs in with a Jenkins credential and pushes both tags |
| Deploy | Replaces the running container and checks `/health` |

**Trigger:** `pollSCM` checks the repo every minute. A GitHub webhook (`<jenkins-url>/github-webhook/`) can trigger builds instantly.

## Run Jenkins locally
```bash
docker compose up -d --build
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```
Open http://localhost:8080, paste the password, install the suggested plugins, create an admin user.

## Configure the job
1. Manage Jenkins → Credentials → add **Username with password** with ID `dockerhub-creds` (DockerHub username + access token with Read & Write).
2. New Item → **Pipeline** → Pipeline script from SCM → Git → this repo URL, branch `main`, script path `Jenkinsfile`.
3. Click **Build Now**, or push a commit and watch the dashboard.

## Verify
```bash
curl localhost:3000/health
```

## Screenshots
Add screenshots of the Jenkins stage view (all green) and the image on DockerHub here.
