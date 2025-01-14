<table align="center">
<tr>
<td><img src="./public/vite.svg" alt="Vite" width="100" height="100"></td>
<td><img src="./public/react.svg" alt="React" width="100" height="100"></td>
<td><img src="./public/typescript.svg" alt="TypeScript" width="100" height="100"></td>
<td><img src="./public/tailwind.svg" alt="TailwindCSS" width="100" height="100"></td>
</tr>
</table>

# Vite + React + TypeScript + TailwindCSS Example Project

This example project is a Phone Catalogue and it was created with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/) and [TailwindCSS](https://tailwindcss.com/).

This projects purpose is to show how to use these technologies together.

Since this project is only a frontend project, it reads the data from a [`items.json`](./src/assets/items.json) file.

## Demo

[Phone Catalogue](https://phone-catalogue.kovacsbalinthunor.com/)

## Usage

### Clone repository

```bash
git clone https://github.com/MemerGamer/vite-react-ts-tailwind-example.git
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

## To recreate this project from the base

### Install vite with react and typescript

```bash
npm init vite@latest
# fill in the project name and select react-ts
```

### Install tailwindcss

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

```bash
npx tailwindcss init -p
```

### Install heroicons

```bash
npm install @heroicons/react
```

# Tunga Developer Diary

The **Tunga Developer Diary** is a web application designed to enhance the developer experience for current and future cohorts of the Tunga Impact Academy (TIA). The app allows users to store, manage, and access developer resources, assignment links, presentation snippets, and personal notes, providing a centralized and organized platform tailored for TIA-specific needs.

## Technologies Used

1. **React with TypeScript**: For building a robust and scalable frontend.
2. **Tailwind CSS**: A utility-first CSS framework for efficient and responsive styling.
3. **Framer Motion**: For creating smooth and engaging animations.
4. **Truncate HTML**: To manage text overflow and maintain clean UI.
5. **SweetAlert2**: For user-friendly alerts and confirmation dialogs.
6. **date-fns**: A lightweight library for date formatting and manipulation.
7. **react-datepicker**: Ensures consistent date-picking experiences across devices.
8. **Google Embedded Calendar**: Provides a seamless way to track and correlate notes with specific events.

## Use Cases

The **Tunga Developer Diary** supports the following use cases:

1. **Resource Management**: Allows cohorts to store and organize developer resource links for easy reference.
2. **Assignment Storage**: Provides a space to save and access assignment links efficiently.
3. **Presentation Snippets**: Offers a place to store snippets from presentations for future use.
4. **Personal Notes**: Enables users to jot down and manage personal notes conveniently.

## Why Use Tunga Developer Diary

1. **Organized Note Management**: Avoids mixing unrelated notes and ensures easy access to TIA-specific resources.
2. **Lifetime Resource Access**: Allows cohorts to search, sort, and filter TIA mentor resources, even after completing the program.
3. **Event Tracking**: Integrates Google Calendar to help users correlate notes with specific cohort activities and events.
4. **Quick Access Links**:
   - Direct links to the TIA platform.
   - Link to Tunga's official [LinkedIn page](https://www.linkedin.com/company/tunga).

## Future Plans

To further enhance the functionality of the Tunga Developer Diary, the following features are planned:

1. **Authentication Features**:
   - User Sign-up.
   - Password reset functionality.
   - Password update options.
2. **Backend Integration**: Leverage skills from the Backend with JS track to implement these functionalities.
3. **Ecosystem Integration**: If adopted by Tunga Management, integrate the Developer Diary into the TIA ecosystem to benefit future cohorts.

## Getting Started

### Prerequisites

1. Node.js (version 16 or later).
2. npm or yarn for package management.

### Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your hosting platform.

## Contributions

Contributions are welcome! If you have ideas or suggestions, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

Special thanks to the Tunga Impact Academy for providing the inspiration and support to create this application.
