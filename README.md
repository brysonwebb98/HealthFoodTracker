# Health Food Tracker API

## Project Description

The Health Food Tracker API is a backend API that allows users to track the foods they eat throughout the day.

Users will be able to create, view, update, and delete food entries. Each food entry will include basic nutrition information such as the food name, calories, protein, meal type, and date.

## Project Information

- **Project Name:** Health Food Tracker API
- **Database Name:** Health
- **Collection Name:** foods

## Planned Features

- Get all food entries
- Get one food entry by ID
- Add a new food entry
- Update an existing food entry
- Delete a food entry

## Example Food Entry

```json
{
  "_id": "6a21161207ef8883071906a0",
    "foodName": "Apple",
    "calories": 95,
    "mealType": "snack",
    "servingSize": "1 medium",
    "protein": 0.5,
    "carbs": 25,
    "fat": 0.3,
    "date": "2026-06-04T06:07:14.299Z"
}
```

## Purpose

The purpose of this project is to practice building a Node.js backend API connected to MongoDB. This project will use REST API routes to perform CRUD operations on food tracking data.

## Technologies
- Node.js
- Express
- MongoDB
- Render
- Swagger API Documentation
