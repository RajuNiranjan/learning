import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/auth.model';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/dtos/Auth/Register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, userName } = registerDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      new ConflictException(
        'user already existed with this email or user name',
      );
    }

    const profilePictrue = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(userName)}`;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      email,
      userName,
      profilePictrue,
      password: hashPassword,
    });

    await newUser.save();

    const payload = { userId: newUser._id };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
