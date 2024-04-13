---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Flutter configure Push Notification On IOS"
pubDate: 2024-04-11
description: "Setup flutter flavor and configure push notification on ios using APNs integration."
author: "Hoang Pham"
image:
  url: "https://lh3.googleusercontent.com/drive-viewer/AKGpihaRtN5icOOYIY3VVlObZ_yrorbOWRnzaZL8TmhdGqp97x70lIjlT2oHDXaIN5UP4zOsiNs9FIyJs1fKxjCvjJDqLo2thzGzxw=s1600-v0"
  alt: "Image illustration integration of FastAPI and Google Cloud Service."
tags: ["blogging", "flutter", "ios"]
---

In development life cycle, we usually separate some environment for convention on development, testing, and deploy phrase. Today we will work thought the build flavor in flutter feature that help us solve ours concern.
<br><br>

### Setup build flavor.

<br>

We can have two or more `main_suffix.dart` where `suffix` can be `dev` or `prod`, `stg`. When application running we can use one of those to initial environment correspondent.<br>

Example:

<br><br>

`main_dev.dart`

```dart

  /// Some other .....
  import 'firebase_options_dev.dart';

  void main() async {
    currentEnvironment = Environment.dev;
    await dotenv.load(fileName: ".env");
    await EnvironmentLoader.load(dotenv);
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  }

```

<br>

`main_prod.dart`

```dart

  /// Some other .....

  import 'firebase_options_prod.dart';

  void main() async {
    currentEnvironment = Environment.prod;
    await dotenv.load(fileName: ".env");
    await EnvironmentLoader.load(dotenv);
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  }

```

<br>

#### Let's go to android app `build.gradle` file

```build.gradle

    productFlavors {
        dev {
            dimension "flavors"
            applicationIdSuffix ".dev"
            resValue "string", "app_name", "App-Dev"
        }

        prod {
            dimension "flavors"
            resValue "string", "app_name", "App-Prod"
        }
    }


```

<br><br>

#### Setup IOS

<br>
Open `xcworkspace` using `XCode` and duplicate default configures fields.

<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbI4kZLCjezgsWF1cUlpwmBIFOFy0H7yTLJdMf0fSXyQF1Pl8X55uBpsJu4PjenOmhlp7EijVpUd9rV5whTf-HNYLyvi0r3CMw=s1600-rw-v1" width="100%" >

<br><br>

add two `scheme` corresponding to above setup.
<br>

<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZmvbp7IN-RspXYb89q5aIta84WR37Hlw3ohGkcFsZA-IZKiDkJWp7z_S7b53I0Nlne90g520BtshyFNq6e7rmxY3ZZ2C0R2RQ=s1600-v0" width="100%">

<br>
Remember add capability for **each** of `Build Active` type.

<br><br>

<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpiha_uPjkAOVz2QKdqyheBUhfG74bBc3606BidqMv8phR_3bH9lIkUzC7M-uzIp7RUf9XwvfeeWwu70PFg59UcLdiV4EcB_Ue8oc=s1600-v0" width="100%">
<br><br>

#### Configure Firebase project.

After create `firebase` project and naming it with your project name, using `flutterfire` to setup configure `flutter` project.

<br>

```sh

  flutterfire configure --project=appName-{flavor}  --out=lib/firebase_options_{flavor}.dart  --ios-bundle-id={ios_bundle_id}.{flavor} --android-app-id={android_bundle_id}.{flavor}

```

<br>

Replace **`flavor`, `ios_bundle_id`,`android_bundle_id`** with your corresponding project.

#### Create app identify and upload file APNs to Firebase.

Go to [developer apple](https://developer.apple.com/account/resources/identifiers/list) and following there instruction to create an identifier to our app.

<br>

<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihaQRUr1Vlj9v0jpG8-XFAq0BOsbI1zJPdEu6mOtE0Zx8BIIrBSDAsu27obakPbS3s9vi-Ny95PUoiOww85qnJ7R8kcCVlSJFg8=s1600-v0" width="100%">

<br>

Navigate to Keys field, create and download this keys and upload to firebase project ios section config.

<br>

<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZ2LDLN88uwZMicdpJwjxIAj7iLh9YOui9KmjhaaIJPNEhhSglSW6TIje6PP2Vfg7v-JQE1YfJo3hkSP2iGmQkFeRrBWNEsdXw=s1600-v0" width="100%">

<br>

on `Firebase`

<br>

<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZAg4VUEcPcUVKqG1NkJibriAg5fXcgYgLptwltBko-_nGTLk4-LkhfUF4U1o3-4CihZObsH8BjSf3zNbyqX_DY1TFh6iu8b9I=s1600-v0" width="100%">
