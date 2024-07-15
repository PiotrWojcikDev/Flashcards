CREATE OR REPLACE FUNCTION update_flashcard_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE sets SET flashcard_count = flashcard_count + 1 WHERE set_id = NEW.set_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE sets SET flashcard_count = flashcard_count - 1 WHERE set_id = OLD.set_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_flashcard_count_after_insert
AFTER INSERT ON flashcards
FOR EACH ROW EXECUTE FUNCTION update_flashcard_count();

CREATE TRIGGER update_flashcard_count_after_delete
AFTER DELETE ON flashcards
FOR EACH ROW EXECUTE FUNCTION update_flashcard_count();




CREATE OR REPLACE FUNCTION update_set_timestamp() RETURNS TRIGGER AS $$
BEGIN
  RAISE NOTICE 'Trigger called: Table=%, Operation=%', TG_TABLE_NAME, TG_OP;

  IF TG_TABLE_NAME = 'sets' AND TG_OP = 'UPDATE' THEN
    NEW.updated_at := CURRENT_TIMESTAMP;
  ELSIF TG_TABLE_NAME = 'flashcards' AND TG_OP IN ('INSERT', 'UPDATE', 'DELETE') THEN
    UPDATE sets
    SET updated_at = CURRENT_TIMESTAMP
    WHERE set_id = COALESCE(NEW.set_id, OLD.set_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER set_before_update
BEFORE UPDATE ON sets
FOR EACH ROW
EXECUTE FUNCTION update_set_timestamp();

CREATE TRIGGER flashcard_after_insert
AFTER INSERT ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_set_timestamp();

CREATE TRIGGER flashcard_after_update
AFTER UPDATE ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_set_timestamp();

CREATE TRIGGER flashcard_after_delete
AFTER DELETE ON flashcards
FOR EACH ROW
EXECUTE FUNCTION update_set_timestamp();