---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Continues integrate, continue deploy Flutter project with GitHub Action, FastLane Part 1. "
pubDate: 2024-04-18
description: "CI/CD Flutter project in workplace."
author: "Hoang Pham"
image:
  url: "https://lh3.googleusercontent.com/drive-viewer/AKGpiha4X1CH_tBlX-fqunz0fINybDxevmwkIEPlfUGG50Len2NvIJuNKe47xw7VN9KX9zKh7ak-xiPwYD84LLJlQzN4AhkFIyp6xhI=s1600-rw-v1"
  alt: "CI/CD illustration life cycle."
tags: ["flutter", "git-action", "fastlane"]
---

There are a lot of stuff when setup environment for Flutter project, especially when in real production where development and deploy speed is most matter, so setup an CI/CD workflows are importance, it not only help the development progress become smooth but also give the artifacts on the hand of the shaker holder (tester,customer) quickly, especially in team employ Agile methodology (Scrum model). In this series, I will work you thought the step by step to setup the Flutter workflows for Flutter for both IOS and Android platform using Github Action, Firebase Distribution and Fastlane to quickly delivery beta product to tester for quickly feedback from them.
<br>

## What I've accomplished

<br>

- [x] **Successfully employ an workflows to delivery both Android and IOS**
      <br>
      I have setup these workflows that quickly delivery artifacts to tester thought all possible channels like email,mattermost...
      <br>

<br>

## Prerequisites.

<br>

For follow this guide you have to install fastlane, you can prefer the document they give to follow their instruction. I suggest you using `rbenv` for manage your `ruby` version to avoid conflict.
<br>

For `fastlane` install by using `brew` you can pass this step, but if you want to test in you local you will need to install it in your machine.

<br><br>

```sh

    gem install bundler

    brew install rbenv

    brew install fastlane
```

<br><br>

### Setup Android

<br>

In you root flutter project navigate to android folder and run: <br>
<br><br>

```sh
  fastlane init
```

<br><br>
<br>
Create `Gemfile` with content: <br>

<br><br>

```sh
  source "https://rubygems.org"
  gem "fastlane"
  plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
  eval_gemfile(plugins_path) if File.exist?(plugins_path)
```

<br><br>

By using `bundler` you can avoid to missing dependencies in your host runner compare to your local machine.
<br>
That will auto detect your platform and auto generate fastlane folder and other `Gemfile` where you can edit your workflow and tools.

<br>
<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZohJGydQ3_hHBolWyV804KtQK1Kk06QGsWXHYWQeiNtnNLS81KTsa02xKb6nogA7jKH9-Q0hCuEIWbI-pPKa3tEKoPOXVXrZU=s2560" width="50%" >
<br><br>

Suppose you have 2 flavor dev and prod in addition you must setup the build flavor and flutter target file for `gradle` known which entry point to begin packing your code.
<br>

From android folder navigate to app folder, select `build.gradle` file under `defaultConfig` section setup build flavor like bellow.<br>

<br><br>

```gradle
    flavorDimensions "flavors"

    productFlavors {
        dev {
            dimension "flavors"
            applicationIdSuffix ".dev"
            resValue "string", "app_name", "AppName-Dev"
            flutter.target "lib/main_dev.dart"
        }

        prod {
            dimension "flavors"
            resValue "string", "app_name", "AppName"
            flutter.target "lib/main_prod.dart"
        }
    }
```

<br><br>

If you latter you decide to using gradle remember in `defaultConfig` section there are exits 2 properties that you must be given attention. <br>

<br><br>

```gradle
    defaultConfig {
        // Other setup ...
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }
```

<br><br>

that they will be using to versioning you build artifact, use must manually edit it when using gradle task or you can forget it when using flutter to build your archive file later with <br>

#### Example

```sh
    fvm flutter build apk --release --flavor=dev -t lib/main_dev.dart
```

<br>
<br><br>

Now let move on to the main point where you use fastlane api tools to customize you work. In the previous step when you perform `fastlane init` if you following there step you should be asked provide they path of the `json_key_fille`, this file using for authorize you identify to use google services like Firebase Distribution, ensure that you have permission to delivery archive files to Firebase, for how to get `json_key_fille` file go to Firebase documentation for more detail.

<br>

You should see your `Appfile` content look like this: <br>
<br><br>

```sh
   json_key_file("./release/google-service-dev.json")
   package_name("com.example.app")
```

<br>
<br><br>

You should create each `.env.[suffix]` for each `[suffix]` for each environment, where you can setup specific configure for those. Your `.env.development` may look like this: <br>

<br><br>

```sh
    FIREBASE_APP_DISTRIBUTION="1:101823576827:android:459910d92e24684284dde"
    FIREBASE_GROUP="tester_android"
    DEPLOY_MODE=firebase
    MATTERMOST_URL="https://chat.example.asia/hooks/ei5qq9w9ktnmjxbkdi3m9kmp3w"
    APP_VERSION="0.0.1+18042401"
    PLATFORM="ANDROID"
    APP_URL="https://appdistribution.firebase.dev/i/e3999e2067ea6640"
```

<br><br>

Create `Pluginfile` as we must use a third party to help us easy deploy progress to firebase, full fill it with bellow content: <br>

<br><br>

```
    # Ensure this file is checked in to source control!

    gem 'fastlane-plugin-firebase_app_distribution'
    gem 'fastlane-plugin-changelog'
    gem 'fastlane-plugin-mattermost'
```

In `Fastfile` you can reference to all variable in `.env` file, and use a set of `fastlane` tools like that. <br>

<br><br>

```sh
default_platform(:android)

platform :android do
    lane :deploy do
        if ENV['DEPLOY_MODE'] == "firebase"
            deploy_firebase
        end
    end
    desc "Upload archive to firebase app distribution"
    lane :deploy_firebase do
        firebase_app_distribution(
            app: ENV['FIREBASE_APP_DISTRIBUTION'],
            groups: ENV['FIREBASE_GROUP'],
            apk_path: "../build/app/outputs/flutter-apk/app-dev-release.apk",
            firebase_cli_token: ENV['FIREBASE_CLI_TOKEN'],
            release_notes: File.read("../../release-note.txt")
        )
        send_message
    end
    desc "Send message on mattermost channel for android"
    lane :send_message do
    mattermost(
        url: ENV["MATTERMOST_URL"],
        text: "Your markdown content",
        username: "RELEASE-BOT",
        icon_url: "Your icon url"
    )
    end
end
```

<br><br>

<br>
Be free to customize your workflow as you want. Your fastlane folder should look like: <br>

<br>
<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihY0QeR7-Gnv9j3TkD1n4iQJ4UMy0e685k8K8AUHwsMsYx1UXIvn_1vLGkSIoZN3T-6ykYTe7ooKVJ4tVtpa5PnzEs1-Tl2hOog=s2560" width="50%" >
<br><br>

### With all above setup you can move on to setup github action workflow like this.

<br><br>

```yml
name: Build and release dev environment.
on:
  push:
    tags:
      - dev_v*
jobs:
  set-up:
    name: Set up
    runs-on: [self-hosted, macOS]
    steps:
      - uses: actions/checkout@v3
      - name: Install flutter version
        run: fvm install
      - name: Use flutter version by fvm
        run: fvm use

  build-and-release-android:
    name: Build and release android
    runs-on: [self-hosted, macOS]
    needs: set-up
    steps:
      - name: Create if not exist keystore
        run: |
          touch android/app/upload.keystore
      - name: Update content keystore
        env:
          KEYSTORE_BASE64: ${{ secrets.KEYSTORE_BASE64 }}
          KEYSTORE_PROPERTIES_BASE64: ${{ secrets.KEYSTORE_PROPERTIES_BASE64 }}
        run: |
          echo $KEYSTORE_BASE64 | base64 --decode > android/app/upload.keystore
          echo $KEYSTORE_PROPERTIES_BASE64 | base64 --decode > android/keystore.properties
      - name: Run a script
        run: |
          chmod +x ./release-dev-android.sh
          export FIREBASE_CLI_TOKEN=${{secrets.FIREBASE_CLI_TOKEN}}
          ./release-dev-android.sh
```

<br><br>

As for security you can setup all secret key relevant to you project in secret action section of Github Action, above I have move all relevant information for signing code secret using Github Action environment secret keys. <br>

and for brief, i also create an shell script for running a set of cmd for me. <br>

<br><br>

**`release-dev-android.sh`**

```sh
    fvm flutter clean
    fvm flutter pub get
    fvm flutter build apk --release --flavor=dev -t lib/main_dev.dart
    cd android || exit
    make prepare
    make dev
    cd ..
```

<br><br>
In android folder i create `Makefile` with bellow content: <br>

<br><br>

```sh

READ ?= true

prepare:
	bundle install
	bundle update

dev:
	bundle exec fastlane deploy --env development

prod:
	bundle exec fastlane build --env production
	bundle exec fastlane deploy --env production
```

Here is hold preview project structure.
<br><br>
<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYTs3OEKBHOg2Yr6qE3u11vBCHZQxwcgyDiy6TkwCCMvqEK6rV1MUpF75iH9V3VdLvw1B5BVT9CsYiwa7guhdMyLyWFW5UAfKQ=s1600-rw-v1" width="50%" >
