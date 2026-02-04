<?php
  require_once __DIR__ . '/../vendor/autoload.php';

  // load .env dari root 
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
  $dotenv->load();

  // inisiasi database library
  use Medoo\Medoo;

  $db = new Medoo([
    'type' => 'sqlite',
    'database' => __DIR__ . '/../' . $_ENV['DB_NAME']
  ]);