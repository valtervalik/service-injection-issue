import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { BcryptService } from 'src/hashing/bcrypt.service';
import { User, UserDocument, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('DB_URI') +
          configService.get<string>('DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          //This code works as expected but...
          //Instead of create a new instance, I rather inject the service with the inject array
          //Feel free of creating a hashing.module.ts file if you need as in the posted example
          const hashingService = new BcryptService();
          const schema = UserSchema;

          schema.pre<UserDocument>('save', async function (next: NextFunction) {
            const doc = this;
            if (doc) {
              doc.password = await hashingService.hash(doc.password);
            }
            next();
          });
          return schema;
        },
      },
    ]),
  ],
})
export class DatabaseModule {}
