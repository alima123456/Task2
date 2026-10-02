FROM jenkins/jenkins:lts-jdk17
USER root
# Docker CLI (talks to the host daemon via the mounted socket) + Node.js for the build/test stages
RUN apt-get update && apt-get install -y --no-install-recommends docker.io nodejs npm \
    && rm -rf /var/lib/apt/lists/*
USER jenkins
RUN jenkins-plugin-cli --plugins git workflow-aggregator credentials-binding timestamps
