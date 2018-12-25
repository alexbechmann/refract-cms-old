Param(
  [string]$version
)

# To be executed on build server, see .vsts-ci.yml

$executingDir = Get-Location
$scriptPath = $script:MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$packageJsonLocation = ($dir + '\package.json')

$packageJson = Get-Content $packageJsonLocation -raw | ConvertFrom-Json
$packageJson.version="$version"
$packageJson | ConvertTo-Json  | set-content $packageJsonLocation