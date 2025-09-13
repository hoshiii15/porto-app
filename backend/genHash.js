const bcrypt = require('bcryptjs');
const pw = 'admin123';
bcrypt.hash(pw, 10)
    .then(h => { console.log(h); process.exit(0); })
    .catch(err => { console.error(err); process.exit(1); });
