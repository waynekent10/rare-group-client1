import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getReactions } from '../../utils/data/reactionData';
import ReactionCard from '../../components/ReactionCard';

function Home() {
  const [reactions, setReactions] = useState([]);
  const router = useRouter();

  const loadReactions = () => {
    getReactions().then((data) => setReactions(data));
  };
  useEffect(() => {
    loadReactions();
  }, []);

  return (
    <article className="reactions">
      <h1>Reactions</h1>
      <Button
        onClick={() => {
          router.push('/reactions/new');
        }}
      >
        Add a reaction
      </Button>
      {reactions.map((reaction) => (
        <section key={`reaction--${reaction.id}`} className="reaction">
          <ReactionCard
            id={reaction.id}
            label={reaction.label}
            image_url={reaction.image_url}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
