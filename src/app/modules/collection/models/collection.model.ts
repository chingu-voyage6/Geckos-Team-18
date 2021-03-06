import { Card } from './card.model';

export interface Collection {
  id?: string;
  authorId?: string;
  author?: string;
  name: string;
  public: boolean;
}
