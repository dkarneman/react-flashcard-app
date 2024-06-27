const KEY_LENGTH = 10;

function generateKey() {
    /* Generate a random string of length KEY_LENGTH for use as a unique key */
    return Math.random().toString(36).substring(2, 2 + KEY_LENGTH);
}

export { generateKey };