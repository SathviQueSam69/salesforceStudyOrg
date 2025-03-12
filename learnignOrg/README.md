# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## About

This repo contains metadata related to the Nissan Pay org.

## Project Links
- [Change Log](https://docs.google.com/spreadsheets/d/1sAISla9IzZXncYTBkt5eWPL7R6N7Eh6-1QIW_jTt7no/edit#gid=984052055)
- [Pre / Post Deployment steps](https://docs.google.com/spreadsheets/d/1d4qiD2v8aEG9XJzIK1qm86c5tjul_-gyq3nxbTL2pjU/edit#gid=1359032597)

## Tooling Links
- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
- [sfdx-git-delta](https://github.com/scolladon/sfdx-git-delta)
- [sfdx-scanner](https://github.com/forcedotcom/sfdx-scanner)

# Running Scanning Tools

- $ sfdx scanner run -t "force-app/main/default/classes" -o scanresult.csv --pmdconfig "B2BLERuleset.xml"
- $ sfdx scanner run -t "force-app/main/default/lwc" -o scanresult_linter.csv -e eslint

# Deployment Command Reference

## Get list of Metadata between two commits
```$ git diff <commit hash 1> <commit hash 2> --name-only```

Example: git diff ffc316f2158eb67695e9a871fc295d8206c8c792 5ebbb110ca3ba81bd96abc5a3841476497ed99a5 --name-only

From this list of file names, you can then construct the “-m” metadata list for a delta deployment. For a more automated method of making lists of metadata between commits see [sfdx-git-delta](https://github.com/scolladon/sfdx-git-delta).

## Retrieve Metadata
```$ sfdx force:source:retrieve -m “<Metadata Type>:<API Name>” -u <org alias>```

Example: $ sfdx force:source:retrieve -m “ApexClass:SomeApexClass” -u nissan-pay-acpdev

## Deploy Specific Metadata
```$ sfdx force:source:deploy -m “<Metadata Type>:<API Name>” -u <org alias>```

Example: $ sfdx force:source:deploy -m “ApexClass:SomeApexClass” -u nissan-pay-acpqa
Recommended for incremental deployments

## Deploy Directory of Metadata
```$ sfdx force:source:deploy -p <local path to metadata within ./force-app> -u <org alias>```

Example: $ sfdx force:source:deploy -p ./force-app/main/default/aura/ -u nissan-pay-acpqa

## Deploy Entire Set of Metadata
```$ sfdx force:source:deploy -p ./force-app -u <org alias>```

Example: $ sfdx force:source:deploy -p ./force-app -u nissan-pay-acpqa

Not recommended unless its the initial deploy for a fresh org

## Deployment Validation (append -c to the deploy command)
```$ sfdx force:source:deploy -m “<Metadata Type>:<API Name>” -u <org alias> -c```

Example: $ sfdx force:source:deploy -m “ApexClass:SomeApexClass -u nissan-pay-acpqa -c

Used to prepare a deployment in advance
Validations that are successful against Production can be “quick deployed” in the UI (no test run required)

## Deploy only if Specific Unit Tests Pass
```$ sfdx force:source:deploy -m “<Metadata Type>:<API Name>” -u <org alias> -l RunSpecifiedTests -r <Test Class Names>```

Example: $ sfdx force:source:deploy -m “ApexClass:SomeTestClass_Test” -u nissan-pay-acpqa -l RunSpecifiedTests -r SomeTestClass_Test

Any class deployed will require >= 75% code coverage, so you can either specify tests that give coverage to the classes to be deployed, or run all tests in the org
