Param(
  [string]$version
)

# To be executed on build server, see .vsts-ci.yml

$executingDir = Get-Location
$scriptPath = $script:MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath

# Update package.json dependencies
$packageJsonLocation = ($dir + '\package.json')

$packageJson = Get-Content $packageJsonLocation -raw | ConvertFrom-Json
$packageJson.version = "$version"
$packageJson | ConvertTo-Json | set-content $packageJsonLocation


# Update cli version in new-source-files
$packageJsonLocation = ($dir + '\new-source-files\package.json')

$packageJson = Get-Content $packageJsonLocation -raw | ConvertFrom-Json
$packageJson.devDependencies.'@refract-cms/cli' = "$version"

$packageJson | ConvertTo-Json | set-content $packageJsonLocation
