import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { locals } from "../reducers/locals";
import { fetchLocal } from "../reducers/localsFetch";
import { LocalCard } from "../components/LocalCard";
import { Container } from "../library/LandingPageStyles";
import { Map } from "../components/Map";

export const LocalPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const existingLocal = useSelector((state) =>
    state.locals.locals.find((local) => local.id === id)
  );
  console.log(existingLocal);

  const fetchStatus = useSelector((state) => state.locals.status);
  const error = useSelector((state) => state.locals.error);

  const [loc, setLoc] = useState(existingLocal ? existingLocal : []);

  useEffect(() => {
    if (!existingLocal) {
      dispatch(fetchLocal(id)).then((result) => {
        const newLocal = result.payload;
        setLoc(newLocal);
      });
    }
  }, [dispatch, id]);

  return (
    <Container>
      {loc && (
        <>
          <Map position={loc.geolocation} />
          <LocalCard key={loc.id} loc={loc} />
          </>
      )}
        </Container>
  );
};
