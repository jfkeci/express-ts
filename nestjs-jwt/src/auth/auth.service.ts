import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';

const users = require('../users.json');

@Injectable()
export class AuthService {
    loginLocal(dto: AuthDTO) {
        const { email, password } = dto;
        const user = users.find(u => u.email === email);

        if (!user) throw new UnauthorizedException('Invalid credentials');
        if (user.password !== password) throw new UnauthorizedException(
            'Invalid credentials'
        );

        return user;
    }

    registerLocal(dto: AuthDTO) {
        const { email, password } = dto;
    }
}
