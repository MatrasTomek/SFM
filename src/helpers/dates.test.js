const { formatDate, isValidDate } = require('../helpers/dates');

test('formatDate returns formatted date string', () => {
    expect(formatDate(new Date('2023-01-01'))).toBe('January 1, 2023');
});

test('isValidDate returns true for valid date', () => {
    expect(isValidDate(new Date('2023-01-01'))).toBe(true);
});

test('isValidDate returns false for invalid date', () => {
    expect(isValidDate(new Date('invalid-date'))).toBe(false);
});