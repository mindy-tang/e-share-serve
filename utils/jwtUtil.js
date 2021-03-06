const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

class Jwt {
    constructor(data) {
        this.data = data;
    }

    //生成token
    generateToken() {
        const data = this.data;
        const created = Math.floor(Date.now() / 1000);
        // const cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem'));
        // const token = jwt.sign({
        //     data,
        //     exp: created + 60 * 30,
        // }, cert, { algorithm: 'RS256' });
        return created;
    }

    //校验token
    verifyToken() {
        const token = this.data;
        const cert = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem'));
        let res;
        try {
            const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
            const { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}

module.exports = Jwt;