# Polling System App (NODE-Repository-REST-API)

An Open API represents a polling system. You can add any question and option to the question. Also can vote the option.

## Table of Contents

- [Features](#backend-features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Question

  - Add question
  - Add option to the question
  - Get by id
  - Get all
  - Update
  - Delete

- Option

  - Get by id
  - Get all
  - Update
  - Delete

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirankumar-Matham96/Polling-System-API.git

   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

- Create a `.env` file in the root directory and add the following:
  ```bash
    PORT=3000
    DB_URL=<db_url>
  ```

4. Start the application:

- if dev:

```bash
npm run dev
```

- if production

```bash
 npm run start
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

    POST AWAY - II/
    ├── src/
    │ ├── config/
    │ │ └── db.config.js
    │ ├── features/
    │ │ ├── companies/
    │ │ | ├── company.controller.js
    │ │ | ├── company.repository.js
    │ │ | ├── company.routes.js
    │ │ | └── company.schema.js
    │ │ ├── interviews/
    │ │ | ├── interview.controller.js
    │ │ | ├── interview.repository.js
    │ │ | ├── interview.routes.js
    │ │ | └── interview.schema.js
    │ │ ├── results/
    │ │ | ├── result.controller.js
    │ │ | ├── result.repository.js
    │ │ | ├── result.routes.js
    │ │ | └── result.schema.js
    │ │ ├── student/
    │ │ | ├── student.controller.js
    │ │ | ├── student.repository.js
    │ │ | ├── student.routes.js
    │ │ | └── student.schema.js
    │ │ └── users/
    │ │   ├── user.controller.js
    │ │   ├── user.repository.js
    │ │   ├── user.routes.js
    │ │   └── user.schema.js
    | └── middlewares/
    │   ├── auth.middleware.js
    │   ├── downloadHandler.middleware.js
    │   ├── errorHandling.middleware.js
    │   └── unknownPathHandler.middleware.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── server.js

## API Endpoints

### Postman Collection

```bash
  https://www.postman.com/kirankumar96/workspace/kirankumar-matham-public-workspace/collection/15920123-b701526f-853b-4ba2-93e3-d79b4ddc7666?action=share&creator=15920123
```

### Question Routes

- `POST /api/polling-system/questions/create`: Create a question
- `POST /api/polling-system/questions/<question_id>/options/create`: Create an option for the question
- `GET /api/polling-system/questions`: Get all the questions
- `GET /api/polling-system/questions/<question_id>`: Get the question by id
- `PUT /api/polling-system/questions/<question_id>`: Update the question by id
- `DELETE /api/polling-system/questions/<question_id>/delete`: Delete the question by id

### Option Routes

- `GET /api/polling-system/options`: Get all options
- `GET /api/polling-system/options/<option_id>`: Get the option by id
- `PUT /api/polling-system/options/<option_id>`: Update option by id
- `DELETE /api/polling-system/options/<option_id>/delete`: Delete option by id

## Technologies Used

- Node.js
- Express
- MongoDB (DataBase)
- mongoose
- dotenv
- cors
- express-validator
- REST Full API

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
