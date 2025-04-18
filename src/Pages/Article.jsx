import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ArticleBox } from "../Components/ArticleBox";

// Function to shuffle an array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Article Component
export function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get(
          "https://splititb.harshitacodes.workers.dev/api/finance-articles"
        );
        const shuffledArticles = shuffleArray(response.data);
        setArticles(shuffledArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Filter articles to include only those with complete data
  const filteredArticles = articles.filter(
    (article) =>
      article.title && article.description && article.urlToImage && article.url
  );

  return (
    <Box sx={{ overflow: "hidden", my: 2, mx: 4 }}>
      <Typography variant="h4" gutterBottom>
        Articles Page
      </Typography>
      <Grid container spacing={2}>
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkeletonCard />
              </Grid>
            ))
          : filteredArticles.map((article, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={article.url ? `${article.url}-${index}` : `article-${index}`}
              >
                <ArticleBox
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  image={
                    article.urlToImage && article.urlToImage.startsWith("http")
                      ? article.urlToImage
                      : "https://via.placeholder.com/150"
                  }
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}

// Skeleton Card for Loading State
function SkeletonCard() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </CardContent>
    </Card>
  );
}

