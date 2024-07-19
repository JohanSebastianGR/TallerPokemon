#!groovy

@Library("workflowlibs") _

pipeline {

    options {
        ansiColor colorMapName: 'XTerm'
        buildDiscarder(logRotator(
            numToKeepStr:
                env.BRANCH_NAME ==~ /master/ ? '10' :
                env.BRANCH_NAME ==~ /develop/ ? '5' :
                env.BRANCH_NAME ==~ /release\/.*/ ? '10' :
                env.BRANCH_NAME ==~ /feature\/.|bugfix\/.|hotfix\/.|PR-./ ? '3' : '1',
        ))
        disableConcurrentBuilds(abortPrevious: true)
        skipDefaultCheckout()        
    }

    agent none

    stages {

        stage('Checkout Global Library') {

            steps {

                script{

                    globalBootstrap {

                        libraryName   = "cellsworkflowlibs"
                        libraryBranch = "master"

                        entrypointParams = [
                            type: "cellsApp",
                            buildConfigs: [ config1: [config: "dev.js",
                                                e2econfig: [ ],
                                                build: "vulcanize"]
                                          ],
                            e2eTests: [
                                local: [
                                   e2econfig: ["browser.js"],
                                   abortOnFailure: true,
                                   isLocalTest: true,
                                   baseFolder: "test/e2e",
                                   testRunner: "pepino+acis"
                                ],
                                remoteGalatea: [
                                   e2econfig: ["browser.remoteGalatea.js"],
                                   abortOnFailure: true,
                                   isLocalTest: false,
                                   baseFolder: "test/e2e",
                                   testRunner: "pepino+acis",
                                   e2ePlatform: "galatea"
                                ]
                            ],
                            deployS3: true
                        ]
                    }
                }
            }
        }
    }
}