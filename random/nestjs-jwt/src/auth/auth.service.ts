import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';

const users = require('../users.json');

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    loginLocal(dto: AuthDTO) {
        const { email, password } = dto;
        const user = users.find(u => u.email === email);

        if (!user) throw new UnauthorizedException('Invalid credentials');
        if (user.password !== password) throw new UnauthorizedException(
            'Invalid credentials'
        );

        return {
            token: this.signUser(user.id, user.email, 'user')
        }
    }

    registerLocal(dto: AuthDTO) {
        const { email, password } = dto;
    }

    signUser(
        userId: number,
        email: string,
        type: string,
    ) {
        return this.jwtService.sign({
            sub: userId,
            email,
            type: type
        })
    }
}
