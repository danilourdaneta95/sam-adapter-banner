import { v4 as uuidv4 } from 'uuid';

export default function mapBaseSchema() {
  const val = uuidv4();
  return {
    id: val,
  };
}
