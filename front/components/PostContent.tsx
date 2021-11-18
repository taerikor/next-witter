import React from "react";
import NextLink from "next/link";
import { Link } from "@mui/material";
import styled from "styled-components";

interface PostContentProps {
  content: string;
}

const Hashtag = styled(Link)`
  cursor: pointer;
`;

const PostContent: React.FunctionComponent<PostContentProps> = ({
  content,
}) => {
  return (
    <div>
      {content.split(/(#[^\s#]+)/g).map((text, i) => {
        if (text.match(/(#[^\s#]+)/)) {
          return (
            <NextLink href={`/hashtag/${text.slice(1)}`}>
              <Hashtag>{text}</Hashtag>
            </NextLink>
          );
        }
        return text;
      })}
    </div>
  );
};

export default PostContent;
