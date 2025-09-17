import pool from "@db/pool";
import passport, { DoneCallback } from "passport";
import { Strategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import { IUSer } from "src/interface/user";

const verifyCallback: VerifyFunction = async (
  username: string,
  password: string,
  done
) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const localStategy = new Strategy(verifyCallback);
passport.use(localStategy);

passport.serializeUser((user: any, done) => {
  const u = user as IUSer;
  done(null, u.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    const user = rows[0] as IUSer | undefined;

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
