# Laskutin

**Laskutin** is a program for maintaining billing information. Invoices can be exported as PDF files. The program is used with a browser.

The program is run in two Docker containers. One is for [Laravel](https://laravel.com/) backend and the other is for [Vue.js](https://vuejs.org/) frontend.

This version of the program is merely an experiment and is not intended for production use.

User interface and invoice template are in Finnish.

<br>

## Prerequisities

You must have [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

You must also have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) if you want to run frontend tests.

<br>

## Installation and use

1. Clone this repository to your machine.

2. Run the following command in the root directory of Laskutin.

    ```
    $ docker-compose up -d
    ```

3. Initialize database tables by running the following command. Later, if you want to empty database tables, run this command again.

    ```
    $ docker exec laskutin_backend php artisan migrate:fresh --force
    ```

4. Add user account for an example user. Note that username and password are displayed on the terminal. If you forget password, run this command again.

    ```
    $ docker exec laskutin_backend php artisan db:seed --force --class=AddExampleUser
    ```

5. Populate database tables with example data. If you want more data, run this command several times. You may also skip this phase.

    ```
    $ docker exec laskutin_backend php artisan db:seed --force --class=AddExampleData
    ```

6. Open [http://localhost:8000/](http://localhost:8000/) in your browser and start using Laskutin.

7. To quit Laskutin, close your browser and run the following command.

    ```
    $ docker-compose down
    ```

<br>

## Testing

1. Create `.env` file in the root directory of Laskutin. The file must define environment variables `user`, `group`, `uid`, and `gid` which contain your user account's username, group, numerical user identifier, and numerical group identifier. For example:

    ```
    user=foo
    group=users
    uid=1000
    gid=100
    ```

2. Run the following command in the root directory of Laskutin.

    ```
    $ docker-compose -f docker-compose.dev.yml up -d
    ```

3. Install backend dependencies.

    ```
    $ docker exec laskutin_backend_dev composer install
    $ docker exec laskutin_backend_dev composer run-script post-root-package-install
    $ docker exec laskutin_backend_dev composer run-script post-create-project-cmd
    ```

4. Install frontend dependencies. Run the following commands in the [frontend](frontend) directory.

    ```
    $ npm install
    $ npm run build
    ```

5. Clear Laravel's configuration cache.

    ```
    $ docker exec laskutin_backend_dev php artisan config:clear
    ```

6. Initialize database tables.

    ```
    $ docker exec laskutin_backend_dev php artisan migrate:fresh
    ```

7. Add data for end-to-end tests.

    ```
    $ docker exec laskutin_backend_dev php artisan db:seed --class=InitializeDataForE2E
    ```

8. Run backend unit tests.

    ```
    $ docker exec laskutin_backend_dev vendor/bin/phpunit
    ```

9. Run frontend unit tests. Run the following command in the [frontend](frontend) directory.

    ```
    $ npm run unit
    ```

    Some unit tests may fail due to a snapshot mismatch. It is because [Vuetify](https://vuetifyjs.com/) components (at least [v-btn](https://vuetifyjs.com/en/components/buttons/) component) may put the HTML attributes in varying order. In this case, try to run unit tests in a container.

    ```
    $ docker run --rm -w /test -v $(pwd):/test node:15.14.0-alpine3.13 npm run unit
    ```

10. Run end-to-end tests. Run the following command in the [frontend](frontend) directory.

    ```
    $ npm run e2e -- --url http://localhost:8000 --env chrome
    ```

    If you get "Error connecting to localhost on port 9515" message, try the following.

    ```
    $ npm run e2e -- --url http://localhost:8000 --env firefox
    ```

11. Finally, stop containers.

    ```
    $ docker-compose down
    ```

<br>

## Screenshots

1. Take a look at the [screenshots](screenshots) directory. There is a screenshot of each page and dialog.

2. If you want to regenerate all screenshots, run the following command in the [frontend](frontend) directory. Before running the command, you must initialize testing environment. See [Testing](#testing) section.

    ```
    $ npm run e2e -- --url http://localhost:8000 --env firefox tests/e2e/TakeScreenshots.js
    ```
