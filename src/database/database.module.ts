import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { BcryptService } from 'src/hashing/bcrypt.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { HashingService } from 'src/hashing/hashing.service';
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
        useFactory: (/*hashingService: HashingService*/) => {
          //This code works as expected but...
          //Instead of create a new instance, I rather inject the service with the inject array
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
        // imports: [HashingModule],
        // inject: [HashingService],
      },
    ]),
  ],
})
export class DatabaseModule {}
