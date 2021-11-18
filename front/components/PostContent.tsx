import React from "react";
import NextLink from "next/link";
import { Link } from "@mui/material";
import styled from "styled-components";

interface PostContentProps {
  content: string;
}

export const StyledLink = styled(Link)`
  cursor: pointer;
`;

const PostContent: React.FunctionComponent<PostContentProps> = ({
  content,
}) => {
  return (
    <>
      {content.split(/(#[^\s#]+)/g).map((text, i) => {
        if (text.match(/(#[^\s#]+)/)) {
          return (
            <NextLink passHref key={i} href={`/hashtag/${text.slice(1)}`}>
              <StyledLink>{text}</StyledLink>
            </NextLink>
          );
        }
        return text;
      })}
    </>
  );
};

export default PostContent;
