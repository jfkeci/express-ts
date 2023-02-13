Networth
- use can have one networth
- user can delete networth and create a new one
  - when the user deletes its networth it cascades over to all the payments
- view (crud)
  - user
    - categories
      - project
    - networth
      - payments
        - category
          - project

Categories
- create
- delete
- get all
- set new payment category

Payments
- create
- update
- delete
- get all


Project
- properties
  - id
  - createdAt
  - updatedAt
  - name
  - description
  - ongoing
  - deadline
  - thread
  - tasks
- requests
  - create
    - create project 
  - delete
  - update
  - get all
  - get single

Task
- properties
  - title
  - body
  - due
  - done (boolean)
  - user
  - project
  - createdAt
  - updatedAt
- requests
  - create
  - update
  - delete
  - get
  - get all

ProjectView
  - user
    - project
      - tasks
      - category
        - payments



