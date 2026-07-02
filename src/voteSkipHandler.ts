class VoteSkipHandler {
    private voters: Set<string> = new Set();
    private threshold: number;

    constructor(threshold: number = 8) {
        this.threshold = Math.max(2, threshold);
    }

    setThreshold(threshold: number): void {
        this.threshold = Math.max(2, threshold || 8);
    }

    /** Registers a vote and returns the updated state. */
    addVote(username: string): { count: number; threshold: number; alreadyVoted: boolean; triggered: boolean } {
        const key = username.toLowerCase();
        const alreadyVoted = this.voters.has(key);
        if (!alreadyVoted) this.voters.add(key);

        const count = this.voters.size;
        const triggered = count >= this.threshold;

        if (triggered) this.reset();

        return { count, threshold: this.threshold, alreadyVoted, triggered };
    }

    reset(): void {
        this.voters.clear();
    }
}

export default VoteSkipHandler;
