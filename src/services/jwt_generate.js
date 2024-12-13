import { sign } from 'react-native-pure-jwt'; // assuming you're using the 'jsonwebtoken' package
import { SECRETKEY } from '../common/config';

export const generateToken = async (user) => {
    console.log(SECRETKEY,"user")
    try {
        const token = await sign(
            { 
                id: user.id,
                email: user.email,
                exp: new Date().getTime() + 3600 * 1000,
            },
            SECRETKEY,
            { algorithm: "HS256" }
        );
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
};
