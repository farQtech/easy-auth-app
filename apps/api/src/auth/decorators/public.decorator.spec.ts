import { Public } from './public.decorator';
import { IS_PUBLIC_KEY } from './public.decorator';
import 'reflect-metadata';

describe('Public decorator', () => {
  it('should set IS_PUBLIC_KEY metadata to true', () => {
    @Public()
    class Test {}
    const result = Reflect.getMetadata(IS_PUBLIC_KEY, Test);
    expect(result).toBe(true);
  });
}); 