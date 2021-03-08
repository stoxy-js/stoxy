import { rocketLaunch } from '@rocket/launch';
import { rocketBlog } from '@rocket/blog';
import { rocketSearch } from '@rocket/search';

export default {
  presets: [rocketLaunch(), rocketBlog(), rocketSearch()],
};
