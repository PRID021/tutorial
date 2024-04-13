---
layout: ../../layouts/MarkdownPostLayout.astro
title: "FastAPI, Postgres From Local Development Environment To Production Using Docker, CLoudRun, GoogleCloud-SQL"
pubDate: 2024-04-08
description: "The story of the folk who want to build the world from new techniques."
author: "Hoang Pham"
image:
  url: "https://lh3.googleusercontent.com/drive-viewer/AKGpihZPl8Pw95sK_9J92fTRX4nsbysnzIFca4qmUQNQ6xjZqscF0yXh3J834FmAw7Pfv23g8eoZEIq0kiKOC2zdgszoKWaxpfeE7k4=s1600-v0"
  alt: "Image illustration integration of FastAPI and Google Cloud Service."
tags: ["blogging", "fast-api", "gpc", "docker"]
---

Today I will share some stories about the journey of an beginner who curious about Backed-End, Cloud Computing, who choose FastAPI and GPC as starting point in his journey.
<br><br>

## What I've accomplished

<br>

- [x] **Create an assistance service:**<br>
      First, I created an new assistance service which use ability of the Large Language Model's to answer the question's about addition information that provided. It's use FastAPI an small framework to quickly release and develope, with LangChain library to easy and quickly access LLM's like OpenAPI or Genmini.

<br>

- [x] **Deploy BE on real production environment**<br>
      The BE service have been deploy on GCP so that client can access it thought client app or client website. It's use Cloud SQL as database management, and Cloud Run as the hosting sever for BE service.

**_This is enough for chit chat let get to the starting point._**

<br><br>

## Setup locally environment for development.

<br>

As come to the development process, it's become various choice to pick up some tools, among many framework BE, I found that FastAPI is small and easy to development compare to other like Java Spring Boot, ASP .NET Core. Which approximately 40 lines of code, you are ready have an running service.
<br><br>

#### Installation FastAPI:

<br>

```sh

    pip install fastapi
    pip install "uvicorn[standard]"

```

</br>
Create an `main.py` and fulfill it content:
<br><br>

```python

    from typing import Union

    from fastapi import FastAPI

    app = FastAPI()

    @app.get("/")
    def read_root():
        return {"Hello": "World"}

    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Union[str, None] = None):
        return {"item_id": item_id, "q": q}

```

<br>
And run it.
<br><br>

```sh

    uvicorn main:app --reload

```

<br>
Boom!, You have an service with 2 end-point api. Additional you also have swagger docs and redoc pages that have been attach when run service without configure anything.
<br><br>

#### Installation Pydantic:

<br>

Python populate by flexible syntax with a large mount of library support to AI and calculate but it have some downside one of them is Python is none type define language, so it come to a lot of pain when debug or detect what's going wrong on fly. Here `Pydantic` come to as a hero that save our's life. It's provide a set of field validation, so we can notice what's going wrong.
We also can add `typing` python's module to improve the readable and IDLE will give us better suggestion when coding.

<br>

```sh

    pip install -U pydantic

```

<br>
Here's an example using it in our code:
<br><br>

```python

    from datetime import datetime
    from typing import List, Optional
    from pydantic import BaseModel

    class User(BaseModel):
        id: int
        name: str = 'John Doe'
        signup_ts: Optional[datetime] = None
        friends: List[int] = []

    external_data = {'id': '123', 'signup_ts': '2017-06-01 12:22', 'friends': [1, '2', b'3']}
    user = User(**external_data)
    print(user)
    #> User id=123 name='John Doe' signup_ts=datetime.datetime(2017, 6, 1, 12, 22) friends=[1, 2, 3]
    print(user.id)
    #> 123

```

<br><br>

### Setup ORM library

<br>

Our service will you the conversation data so it essential to choice an ORM for convenient when access database to manipulate data. We using `sqlalchemy` as the comprehensive and easy solution for that.
<br><br>

```sh

    pip install SQLAlchemy

```

<br>

Here we declare an table scheme and when service run it automatic create an table in the Postgres as we choose in later step.
<br><br>

```python

    from sqlalchemy import Boolean, Column, Enum, ForeignKey, Integer, LargeBinary, String,DateTime
    from sqlalchemy.orm import relationship

    class Message(Base):
        __tablename__ = "messages"
        id = Column(Integer, primary_key=True)
        content = Column(String, index=True)
        sender = Column(Enum(Sender))
        conversation_id = Column(Integer, ForeignKey("conversations.id"))
        conversation = relationship("Conversation", back_populates="messages")
        created_at = Column(DateTime,nullable=True)

```

<br><br>

### Setup router

<br>

As the code become larger when develope usually we will break the code relevant to each other in septate files and folder.
<br>
In `main.py` <br>

```python

    app = FastAPI(title="Fast GPT", description="Hand-on practice python and openai")
    # Some other code ....
    # ...  ...
    app.include_router(authenticate.router)
    app.include_router(profile.router)
    app.include_router(chat.router)
    app.include_router(gemi.router)

```

<br>

In `chat.py`
<br><br>

```python

    router = APIRouter(
        prefix="/chat",
        tags=tags,
        responses={status.HTTP_404_NOT_FOUND: {"description": "Not found"}},
    )

```

<br>

### Langchain and OpenAPI, Genmini

<br>

Working direct with raw LLM require some knowledged about promoting technical specific to each kind of model we use. So Langchain provide a various set of api we can you to simplify that progress, we can reference to
[Langchain](https://python.langchain.com/docs/get_started/introduction/) known how to install and use, here I will note some keys note that we must notice.
<br>

Langchain have a set of prompting class that provide an easy way to supply more context to our model, help our model answer the question more accurately. We can also provide addition information to help the model have knowledge specific topic, remember model just known the information when it trained, if you want it known the answers of the question that i have not seen before, you must provide that information to it.

````python

    tools = [retriever_tool, send_notification, delay, create_account]
    llm_with_tools = llm.bind_tools(tools)
    rendered_tools = render_text_description(tools)

    system_prompt = f"""You are an assistant that has access to the following set of tools. Here are the names and descriptions for each tool:

    {rendered_tools}

    Given the user input, you have decide they asking for the tools or not. \
    If they asking for the tool with the content fulfill for the tool invocation.\
    If user missing some content for using this tool, ask them only for missing content until all content fulfill.
    Remember, if you have all information to perform any these tools, you must asking user to confirm these information and the action to take.

    Here is an example:

    ```
        User: I want to create an form for my account?
        AI: Sure!, I can use `create_account` tool to help you, can you provide your username, email, and address \
            After have enough information, I will help you to create an form to new account.
        User: My name is Hoang, I live in California and my email is hoang.pham@executionlab.asia
        AI: I have your all information to create an new form account, Please confirm the  correct  information \
            Your username is : hoang
            Your email is: hoang.pham@executionlab.asia
            Your address is: California
            Is that right?
    ```
    If the user answer yes or Yes or anything that similar for that, you can invoke the tool with all information you have.\

    Denied to answer any question that not relevant to these tools above or not relevant to the information about the developer or project owner.

    """
````

<br>
We cant assign a role for our model as:
<br><br>

```python

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                system_prompt,
            ),
            MessagesPlaceholder(variable_name=MEMORY_KEY),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )

```

<br><br>
OpenAPI provide specific role `system` role that you can provide to our model to specific the way the model behavior when received request.
<br>

Tools is special kind of promoting kind it have only one purpose that supply convention to call `function calling` for some kind of LLM models. It's provide an easy way to parse a `function` in programming language to function calling format that LLM can understand to invoke an function like we execute an normal function but in this situation LLM will be the executor.

We cant defined a simple tool like this.

```python

    @tool
    def delay(s: int):
        """Delay in s in seconds time"""
        time.sleep(s)

```

When we have multiple tools our wonder shall be how our model deceive what tool to use and how many time or oder the tool will be invoke. This is when `agent` come to the stage, by provide the `agent` with a set of tools description our LLM's model will be understand what tool will be require or what chain of tools and order to be invoke.

```python

    agent = (
        {
            "input": lambda x: x["input"],
            "agent_scratchpad": lambda x: format_to_openai_tool_messages(
                x["intermediate_steps"]
            ),
            "chat_history": lambda x: x["chat_history"],
        }
        | prompt
        | llm_with_tools
        | OpenAIToolsAgentOutputParser()
    )

```

<br>

An common key using promoting technic is to build an chatbox we the chatbox can understand or remember the content of conversation, by provide chat history to it we can make our model understand the context of the conversation, remember single llm model can understand single question.
This will come to another question how to storage and retrieve this context?.
As come out `vector storage` database is very appropriate for this kind of work.
some common database population choice is `FUSS`, `Weaviate`.

<br>

### Deploy our app

<br><br>

In deploy phrase, there to many things that can't be describe in single post, so I will breaking down it into another post but here is some key notice.
When deploy to `Cloud Run` we must dockerize our code, so how to make our sever running in docker container can be verify to other service like `GCP SQL`.
There many way to do but one simple way is embedding an authenticate json file in our container. and export and environment `HOME` that some core library of GCP use when finding authenticate file by default.

using `gcloud` cli to generate `application_default_credentials.json` and copy it to our container.

<br><br>

```sh

    gcloud auth application-default login

```

<br>

In our `Dockerfile`:
<br><br>

```Dockerfile

    ENV HOME .
    /...../
    COPY ./application_default_credentials.json $HOME/.config/gcloud/application_default_credentials.json

```

<br><br>
