import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt-u') { }

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt-a') { }

@Injectable()
export class PublicAuthGuard extends AuthGuard('jwt-p') { }