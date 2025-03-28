// import { Link } from "react-router-dom";


// export function ArticleBox({title, description, url,image}){
//     return (
//         <div>
//             {image}
//             {title}
//             {description}
//             {url}
//         </div>
//     )
// }




import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";

  
  // ArticleBox Component
  export function ArticleBox({ title, description, url, image }) {
    return (
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Link href={url} target="_blank" rel="noopener" underline="hover">
            Read More
          </Link>
        </CardContent>
      </Card>
    );
  }
  
  ArticleBox.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
  };