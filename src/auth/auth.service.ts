import { Injectable, NotFoundException } from '@nestjs/common';
import {PrismaService} from 'src/services/prisma/prisma.service';
import {UserService} from 'src/services/user/user.service';
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {

	constructor(private readonly jwtService : JwtService, private readonly prismaService : PrismaService){}

	public async login(walletAddress : string) {

		const user = await this.prismaService.user.findUnique({
  		    where: {
        		walletAddress,
      		    },
    		});

    		if (!user) {
      			throw new NotFoundException({
        			message: 'User not found',
      			});
    		}

    		const payload = { ...user };
    		const jwt = this.jwtService.sign(payload);

    		return { accessToken: jwt };
	}




}
