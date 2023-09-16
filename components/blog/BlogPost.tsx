import { IPost } from '_lib/types';
import { Content } from 'components/Content';

const BlogPost = (props: IPost) => {
  const { content } = props;

  return (
    <div key={props._key} className=" py-24 md:py-40">
      <div className="sm:-px-6 mx-auto max-w-3xl px-6 pb-12 lg:max-w-4xl">
        <Content content={content} />
      </div>
    </div>
  );
};

export default BlogPost;
