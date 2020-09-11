# Register and Login

**Register**
----
  _register new user._

* **URL**

    `/register`

* **Method:**

    `POST`
  
*  **URL Params**

    `none`

* **Data Params**

    **Required:**
    ```json
    {
        "name" : "string",
        "email" : "string",
        "password" : "string"
    }
    ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
        "msg": "register success",
        "user": {
            "id": 1,
            "name": "sample name",
            "email": "sample@mail.domain"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "name is required",
            "invalid email",
            "password minimum of 6 character"
        ]
    }
    ```

  OR
  
  * **Code:** 400 UNIQUE CONSTRAINT ERROR <br />
    **Content:**
    ```json
    {
        "errors": [
            "please use different email"
        ]
    }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```

**Login**
----
  _login to server._

* **URL**

    `/login`

* **Method:**

    `POST`
  
*  **URL Params**

    `none`

* **Data Params**

    **Required:**
    ```json
    {
        "email" : "string",
        "password" : "string"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "name": "sample name",
        "email": "sample@mail.domain",
        "access_token": "accessTokeninJWT"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 INVALID CREDENTIAL <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid email or password"
        ]
    }
    ```

  OR

  * **Code:** 400 FORM ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "make sure all the required field is not empty"
        ]
    }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```

**Google Sign In**
----
  OAuth Google

* **URL**

  `/googleSign`

* **Method:**
  
  `POST`

* **URL Params**

   `none`

* **Data Params**

  `id_token`

  *you need to successfully signed in using your google account to automatically get `id_token`*

* **Success Response:**

  * **Code:** 200 SIGN IN SUCCESS <br />
    **Content:**
    ```json
    {
      "access_token": "returningYourJWTAccessToken",
      "email": "example@email.com",
      "name": "exmple"
    }
    ```

* **Error Response:**

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```


# Task Endpoints

**Fetch All Tasks**
----
  _Fetching all tasks data in one organization._

* **URL**

    `/tasks`

* **Method:**

    `GET`

* **Headers:**

    `access_token`

*  **URL Params**

    `none`

* **Data Params**

    `none`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "msg": "fetching success",
        "organization": "Hacktiv8",
        "tasks": [
            {
            "id": 1,
            "title": "Title one",
            "category": "backlog",
            "createdAt": "2020-09-09T01:27:33.966Z",
            "User": {
                "id": 1,
                "name": "sample name",
                "email": "sample@gmail.com",
                "organization": "Hacktiv8"
                }
            },
            {
            ....
            }
        ]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "authentication failed"
        ]
    }
    ```

  OR

  * **Code:** 401 INVALID TOKEN <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid access_token"
        ]
    }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```

**Create New Tasks**
----
  _Creating new task._

* **URL**

    `/tasks/:category` <br>

* **Method:**

    `POST`

* **Headers:**

    `access_token`

*  **URL Params**

    **Required:**
 
    `category=[string]` <br>
    _options : backlog, todo, doing, done._

* **Data Params**

    **Required:**
    ```json
    {
        "title": "string"
    }
    ```

* **Success Response:**

    * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "msg": "created successfully",
        "task": {
            "title": "Sample new task",
            "category": "backlog",
            "user": "sample@sample.com"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "title is required"
        ]
    }
    ```

  OR

  * **Code:** 400 INVALID INPUT <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid category"
        ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "authentication failed"
        ]
    }
    ```

  OR
  
  * **Code:** 401 INVALID TOKEN <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid access_token"
        ]
    }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```

**Update Tasks**
----
  _Update task's title and category._

* **URL**

    `/tasks/:id`

* **Method:**

    `PUT`

* **Headers:**

    `access_token`

*  **URL Params**

    **Required:**
 
    `id=[integer]`

* **Data Params**

    **Required:**
    ```json
    {
        "title": "string",
        "category": ["backlog" / "todo" / "doing" / "done"]
    }
    ```

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "msg": "edit success",
        "task": {
            "title": "Edited Title",
            "category": "done"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "title is required"
        ]
    }
    ```

    OR
    <br>
    _if passed an empty required input form_
    ```json
    {
        "errors": [
            "make sure all the required field is not empty"
        ]
    }
    ```

  OR

  * **Code:** 400 INVALID INPUT <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid category"
        ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "authentication failed"
        ]
    }
    ```

  OR

  * **Code:** 401 AUTHORIZATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "not authorized"
        ]
    }
    ```

  OR
  
  * **Code:** 401 INVALID TOKEN <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid access_token"
        ]
    }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```

**Update Task's Category**
----
  _Update task's category only, you can use this to toggle each task's category._

* **URL**

    `/tasks/:id/:category`

* **Method:**

    `PATCH`

* **Headers:**

    `access_token`

*  **URL Params**

    **Required:**
 
    `id=[integer]`

    AND

    `category=[string]` => options ["backlog" / "todo" / "doing" / "done"]

* **Data Params**

    `none`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "msg": "change category success",
        "task": {
            "title": "Editet Title",
            "category": "done"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid category"
        ]
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
        "errors": [
            "task not found"
        ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "authentication failed"
        ]
    }
    ```

  OR

  * **Code:** 401 AUTHORIZATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "not authorized"
        ]
    }
    ```

  OR
  
  * **Code:** 401 INVALID TOKEN <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid access_token"
        ]
    }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```

**Delete Task**
----
  _Delete task._

* **URL**

    `/tasks/:id`

* **Method:**

    `DELETE`

* **Headers:**

    `access_token`

*  **URL Params**

    **Required:**
 
    `id=[integer]`

* **Data Params**

    `none`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "msg": "delete success",
        "task": {
            "title": "Sample new task",
            "category": "backlog"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
        "errors": [
            "task not found"
        ]
    }
    ```

  OR

  * **Code:** 401 AUTHENTICATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "authentication failed"
        ]
    }
    ```

  OR

  * **Code:** 401 AUTHORIZATION FAILED <br />
    **Content:** 
    ```json
    {
        "errors": [
            "not authorized"
        ]
    }
    ```

  OR
  
  * **Code:** 401 INVALID TOKEN <br />
    **Content:** 
    ```json
    {
        "errors": [
            "invalid access_token"
        ]
    }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
    ```