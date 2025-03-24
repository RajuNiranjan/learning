import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controllers/auth.controller';
import { User, UserModel } from 'src/models/auth.model';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI as string),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES_IN'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
