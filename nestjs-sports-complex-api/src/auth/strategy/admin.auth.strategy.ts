import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'jwt-a') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'nest-sports-api-31k2maaAdS2Kl'
        })
    }

    async validate(payload: any) {
        console.log(payload)
        if (payload.type == 'admin') return payload;
    }
}