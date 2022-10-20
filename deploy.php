<?php

/**
 * This file is part of the "Volunteers CRM" project.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Andrey Helldar <helldar@dragon-code.pro>
 * @copyright 2022 Andrey Helldar
 * @license MIT
 *
 * @see https://github.com/volunteers-crm
 */

declare(strict_types=1);

namespace Deployer;

require 'contrib/npm.php';
require 'contrib/telegram.php';

// Config

set('application', 'Volunteers CRM');
set('repository', 'git@github.com:volunteers-crm/web.git');

// Notification

set('telegram_token', $_SERVER['TELEGRAM_DEPLOY_TOKEN']);
set('telegram_chat_id', $_SERVER['TELEGRAM_DEPLOY_CHAT_ID']);

set('telegram_text', 'Deploying `{{branch}}` to *{{target}}*' . PHP_EOL . PHP_EOL . '*Application*: {{application}}');
set('telegram_success_text', 'Deployed some fresh code to *{{target}}*' . PHP_EOL . PHP_EOL . '*Application*: {{application}}');
set('telegram_failure_text', 'Something went wrong during deployment to *{{target}}*' . PHP_EOL . PHP_EOL . '*Application*: {{application}}');

// Hosts

host('production')
    ->setHostname($_SERVER['DEPLOY_IP'])
    ->setRemoteUser('forge')
    ->setDeployPath('~/domains/' . $_SERVER['DEPLOY_HOSTNAME']);

// Tasks

task('deploy', [
    'deploy:prepare',
    'npm:install',
    'npm:run:prod',
    'deploy:publish',
]);

task('npm:run:prod', function () {
    cd('{{release_path}}');
    run('npm run build');
});

before('deploy', 'telegram:notify');

after('deploy:success', 'telegram:notify:success');

after('deploy:failed', 'deploy:unlock');
after('deploy:failed', 'telegram:notify:failure');
