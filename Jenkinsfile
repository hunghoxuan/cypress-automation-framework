@Library('jenkins-google-chat-notification')_
pipeline {

    agent any

    triggers {

        cron('0 7 * * 1-5')
    }

    environment {

        GOOGLE_CHAT_URL = 'https://chat.googleapis.com/v1/spaces/AAAAE9pVAMQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=J5u2MEk9cg2E680VkVbM935WNKuDHf3V_ym0H1sVoBI%3D'
    }

    tools {

        nodejs 'NodeJS 16.x'
    }

    parameters {

        string(name: 'INCLUDE_TESTS', defaultValue: "\"**/*.cy.js\"", description: "Enter which test file(s) will be executed.\n By default all test files will be executed.\n Test files should be entered as follows: \"**/testsFileName1.cy.js,**/testsFileName2.cy.js\" etc")
        choice(name: 'BROWSER', choices:['chrome', 'firefox'], description: "Choose the browser where you want to execute the tests.")
    }

    options {

        ansiColor('xterm')
    }

    stages {

        stage ('Cleaning the workspace') {

            steps {
                cleanWs()
                checkout scm
                echo "Building ${env.JOB_NAME}..."
            }
        }

        stage('Installing npm packages') {

            steps {
                echo "Installing npm packages needed for the project!"
                sh "npm ci"
            }
        }

        stage('Running tests') {

            steps {
                echo "Executing the tests!"
                sh "npx cypress run --browser ${BROWSER} --env oracleInstantClientPath=/opt/oracle/instantclient_21_8 --spec ${INCLUDE_TESTS}"
            }
        }
    }

    post {
        always {

            // sendGoogleChat("""${currentBuild.currentResult}: *${JOB_NAME}*\n
            //     SPEC files included in the execution: ${INCLUDE_SPECS}\n
            //     Browser: ${BROWSER}\n
            //     More info can be found at <${env.BUILD_URL}|here> while console output can be viewed from <${env.BUILD_URL}/console|here>.
            //     """, chatURL)

            script {
                allure ([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'target/allure-results']]
                ])
            }

            sendGoogleChatBuildReport(message: "<a href=\"${env.BUILD_URL}allure\">Click to see REPORT</a>")
        }     
    }
}