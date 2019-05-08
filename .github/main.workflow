workflow "Build and test" {
  on = "push"
  resolves = ["Build", "Test"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "test"
}

workflow "Publish to NPM on release" {
  on = "release"
  resolves = [
    "GitHub Action for Slack",
    "GitHub Action for Slack-1",
  ]
}

action "Publish to NPM" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  runs = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}

action "GitHub Action for Slack" {
  uses = "Ilshidur/action-slack@5faabb4216b20af98fe77b6d9048d24becfefd31"
  secrets = ["SLACK_WEBHOOK"]
  args = "Deploying new version."
}

action "GitHub Action for Slack-1" {
  uses = "Ilshidur/action-slack@5faabb4216b20af98fe77b6d9048d24becfefd31"
  needs = ["Publish to NPM"]
  secrets = ["SLACK_WEBHOOK"]
  args = "Deployment complete."
}
