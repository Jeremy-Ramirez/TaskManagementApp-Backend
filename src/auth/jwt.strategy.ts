import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Extraer el token del header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 2. Definir el algoritmo de firma (Cognito usa RS256)
      algorithms: ['RS256'],
      // 3. Obtener dinámicamente la clave pública desde AWS
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // La URL estándar de las claves de tu User Pool
        jwksUri: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
      }),
    });
  }

  // 4. Si el token es válido, este método se ejecuta y lo que retornes se inyecta en `req.user`
  async validate(payload: any) {
    return {
      userId: payload.sub, // 'sub' es el ID único del usuario en Cognito
      email: payload.email,
    };
  }
}
