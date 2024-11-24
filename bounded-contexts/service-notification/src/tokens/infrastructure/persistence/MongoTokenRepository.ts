import { TokenRepository } from "../../domain/TokenRepository";
import { Token } from "../../domain/Token";
import { TokenStatus } from "../../domain/value-objects/TokenStatus";
import mongoose, { Document, Schema } from "mongoose";
import { Identifier } from "../../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../../_shared/domain/value-objects/EventType";

interface TokenDocument extends Document {
  id: string;
  userId: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  status: string;
  eventType: string;
}

const tokenSchema = new Schema<TokenDocument>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  status: { type: String, required: true },
  eventType: { type: String, required: true },
});

const TokenModel = mongoose.model<TokenDocument>("Token", tokenSchema);

export class MongoTokenRepository implements TokenRepository {
  async save(token: Token): Promise<void> {
    await TokenModel.findOneAndUpdate(
      { id: token.getId().getValue() },
      {
        userId: token.getUserId().getValue(),
        code: token.getCode(),
        createdAt: token.getCreatedAt(),
        expiresAt: token.getExpiresAt(),
        status: token.getStatus().getValue(),
        eventType: token.getEventType().getValue(),
      },
      { upsert: true, new: true }
    ).exec();
  }

  async findByUserId(userId: Identifier): Promise<Token | null> {
    const tokenDocument = await TokenModel.findOne({
      userId: userId.getValue(),
    })
      .sort({ createdAt: -1 })
      .exec();
    return tokenDocument ? this.mapDocumentToToken(tokenDocument) : null;
  }

  async findByCode(code: string): Promise<Token | null> {
    const tokenDocument = await TokenModel.findOne({ code }).exec();
    return tokenDocument ? this.mapDocumentToToken(tokenDocument) : null;
  }

  async updateStatus(tokenId: Identifier, status: TokenStatus): Promise<void> {
    await TokenModel.updateOne(
      { id: tokenId.getValue() },
      { status: status.getValue() }
    ).exec();
  }

  private mapDocumentToToken(tokenDocument: TokenDocument): Token {
    return new Token(
      Identifier.fromString(tokenDocument.userId),
      tokenDocument.code,
      tokenDocument.expiresAt,
      TokenStatus.from(tokenDocument.status),
      EventType.fromString(tokenDocument.eventType),
      Identifier.fromString(tokenDocument.id),
      tokenDocument.createdAt
    );
  }
}
