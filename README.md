# MyBirthdays

A small TypeScript project that reads birthdays from a JSON file and lists:

- Today's birthdays
- Birthdays in the current month
- Birthdays in the previous month
- Birthdays in the next month

I'll never forget a birthday anymore.

# JSON

The data is stored in a json (`birthdays.json`) with the following structure (or check `example.json`):

```json { "data": [ { "name": "Alice", "day": 10, "month": 1, "year": 1990 }, { "name": "Bob", "day": 14, "month": 2, "year": 1985 }, { "name": "Charlie", "day": 20, "month": 3, "year": 2000 } ] } ```